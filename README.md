# 3.增加下载标记对应图像png格式
修改platform\core\src\utils\downloadJSONReport.js

# 2.增加导出JSON report，以及选择导出报告格式对话框
1. 新建platform\core\src\utils\downloadJSONReport.js
2. 修改extensions\measurement-tracking\src\panels\PanelMeasurementTableTracking\index.tsx，增加选择报告格式对话框

# 1.修改csv report，增加导出像素坐标
修改extensions\cornerstone\src\utils\measurementServiceMappings\{Angle.ts,Bidirectional.js, CobbAngle.ts, EllipticalROI.js, Length.js, RectangleROI.ts}中的 _getReport函数，使导出csv report时增加标记点的图像像素坐标
