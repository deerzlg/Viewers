# 1.修改csv report，增加导出像素坐标
修改extensions\cornerstone\src\utils\measurementServiceMappings\{Angle.ts,Bidirectional.js, CobbAngle.ts, EllipticalROI.js, Length.js, RectangleROI.ts}中的 _getReport函数，使导出csv report时增加标记点的图像像素坐标
