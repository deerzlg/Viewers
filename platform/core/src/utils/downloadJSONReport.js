import { utilities as csUtils } from '@cornerstonejs/core';

//measurementData is an object contains all measurements
export default function downloadJSONReport(measurementData) {
  if (measurementData.length === 0) {
    // Prevent download of report with no measurements.
    return;
  }

  let tempMeasurementData = JSON.parse(JSON.stringify(measurementData)); //deep copy

  const downloadedImages = []; //to avoid downloading the same image twice

  for (let i = 0; i < tempMeasurementData.length; ++i) {
    tempMeasurementData[i].imagePoints = _transWorldToImage(
      tempMeasurementData[i].points,
      tempMeasurementData[i].metadata.referencedImageId
    );
    //clean json data
    delete tempMeasurementData[i].FrameOfReferenceUID;
    delete tempMeasurementData[i].metadata.viewPlaneNormal;
    delete tempMeasurementData[i].metadata.viewUp;
    delete tempMeasurementData[i].referenceSeriesUID;
    delete tempMeasurementData[i].referenceStudyUID;
    delete tempMeasurementData[i].toolName;
    delete tempMeasurementData[i].data;
    delete tempMeasurementData[i].source;
    delete tempMeasurementData[i].modifiedTimestamp;
    delete tempMeasurementData[i].selected;

    if (downloadedImages.includes(tempMeasurementData[i].SOPInstanceUID)) {
      continue;
    }
    downloadedImages.push(tempMeasurementData[i].SOPInstanceUID);
    const wadoUrl = csUtils.imageIdToURI(
      tempMeasurementData[i].metadata.referencedImageId
    ); //Removes the data loader scheme from the imageId
    _downloadPngImage(wadoUrl, tempMeasurementData[i].SOPInstanceUID);
  }

  const jsonDoc = JSON.stringify(tempMeasurementData);
  let jsonContent = 'data:text/json;charset=utf-8,' + jsonDoc;

  _createAndDownloadFile(jsonContent);
}

function _downloadPngImage(wadoUrl, SOPInstanceUID) {
  const wadoUrlRendered = wadoUrl + '/rendered';
  //console.log(wadoUrlRendered);
  fetch(wadoUrlRendered)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      //console.log(blob.type);
      const link = document.createElement('a');
      link.href = url;
      link.download = SOPInstanceUID + '.png'; //SOPInstanceUID unique for each image
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error(error));
}

function _createAndDownloadFile(jsonContent) {
  const encodedUri = encodeURI(jsonContent);

  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'MeasurementReport.json');
  document.body.appendChild(link);
  link.click();
}

function _transWorldToImage(points, referencedImageId) {
  const imagePoints = [];
  for (let i = 0; i < points.length; ++i) {
    imagePoints.push(csUtils.worldToImageCoords(referencedImageId, points[i]));
  }
  return imagePoints;
}
