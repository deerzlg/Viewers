import { utilities as csUtils } from '@cornerstonejs/core';

//measurementData is an object contains all measurements
export default function downloadJSONReport(measurementData) {
  if (measurementData.length === 0) {
    // Prevent download of report with no measurements.
    return;
  }

  const downloadedImages = []; //to avoid downloading the same image twice

  for (let i = 0; i < measurementData.length; ++i) {
    //console.log(measurementData[i]);
    measurementData[i].imagePoints = _transWorldToImage(
      measurementData[i].points,
      measurementData[i].metadata.referencedImageId
    );
    if (downloadedImages.includes(measurementData[i].SOPInstanceUID)) {
      continue;
    }
    downloadedImages.push(measurementData[i].SOPInstanceUID);
    const referencedImageId = measurementData[i].metadata.referencedImageId;
    const regex = /wadors:(.*)/;
    const wadoUrl = referencedImageId.match(regex)[1];

    _downloadPngImage(wadoUrl, measurementData[i].SOPInstanceUID);
  }

  const jsonDoc = JSON.stringify(measurementData);
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
