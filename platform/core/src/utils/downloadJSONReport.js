import { utilities as csUtils } from '@cornerstonejs/core';

//measurementData is an object contains all measurements
export default function downloadJSONReport(measurementData) {
  if (measurementData.length === 0) {
    // Prevent download of report with no measurements.
    return;
  }

  for (let i = 0; i < measurementData.length; ++i) {
    //console.log(measurementData[i]);
    measurementData[i].imagePoints = _transWorldToImage(
      measurementData[i].points,
      measurementData[i].metadata.referencedImageId
    );
  }

  const jsonDoc = JSON.stringify(measurementData);
  let jsonContent = 'data:text/json;charset=utf-8,' + jsonDoc;

  _createAndDownloadFile(jsonContent);
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
