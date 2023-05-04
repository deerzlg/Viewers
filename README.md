# 4.增加导入json数据标记
1. 修改modes\longitudinal\src\toolbarButtons.js，在右侧工具栏添加了一个按钮
2. 修改extensions\default\src\commandsModule.ts，添加openJsonImportDialog函数，目前仅直线，双向直线，椭圆，矩形，角度可以导入
3. 修改platform\core\src\utils\downloadJSONReport.js，减少标记数据json文件无关数据项


# 3.增加下载标记对应图像png格式
修改platform\core\src\utils\downloadJSONReport.js

# 2.增加导出JSON report，以及选择导出报告格式对话框
1. 新建platform\core\src\utils\downloadJSONReport.js
2. 修改extensions\measurement-tracking\src\panels\PanelMeasurementTableTracking\index.tsx，增加选择报告格式对话框

# 1.修改csv report，增加导出像素坐标
修改extensions\cornerstone\src\utils\measurementServiceMappings\{Angle.ts,Bidirectional.js, CobbAngle.ts, EllipticalROI.js, Length.js, RectangleROI.ts}中的 _getReport函数，使导出csv report时增加标记点的图像像素坐标
