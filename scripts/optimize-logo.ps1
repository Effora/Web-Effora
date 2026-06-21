Add-Type -AssemblyName System.Drawing

$logoPath = Join-Path $PSScriptRoot "..\assets\effora-logo.png"
$size = 104

$img = [System.Drawing.Image]::FromFile($logoPath)
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($img, 0, 0, $size, $size)

$tempPath = Join-Path (Split-Path $logoPath) "effora-logo-sm.png"
$bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Logo optimized to ${size}x${size}: $((Get-Item $tempPath).Length) bytes -> $tempPath"
