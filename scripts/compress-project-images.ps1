param(
  [int]$MaxWidth = 960,
  [int]$Quality = 78
)

Add-Type -AssemblyName System.Drawing

$projectsDir = Join-Path $PSScriptRoot "..\assets\projects"
$registroAssets = "C:\Users\mel_o\OneDrive\Desktop\Proyectos\Registro de operaciones Inmobiliarias\REGISTRO-DE-OPERACIONES\public\landing\assets"

function Compress-ImageFile {
  param(
    [string]$InputPath,
    [string]$OutputPath,
    [int]$MaxW,
    [int]$Q
  )

  if (-not (Test-Path $InputPath)) {
    Write-Warning "Missing: $InputPath"
    return $null
  }

  $img = [System.Drawing.Image]::FromFile($InputPath)
  try {
    $ratio = if ($img.Width -gt $MaxW) { $MaxW / $img.Width } else { 1 }
    $newW = [int][Math]::Round($img.Width * $ratio)
    $newH = [int][Math]::Round($img.Height * $ratio)

    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Q)
    $bmp.Save($OutputPath, $encoder, $encParams)

    $g.Dispose()
    $bmp.Dispose()

    $before = (Get-Item $InputPath).Length
    $after = (Get-Item $OutputPath).Length
    Write-Host ("OK {0} -> {1} ({2}KB -> {3}KB, {4}x{5})" -f (Split-Path $InputPath -Leaf), (Split-Path $OutputPath -Leaf), [math]::Round($before/1KB), [math]::Round($after/1KB), $newW, $newH)
    return @{ Width = $newW; Height = $newH }
  }
  finally {
    $img.Dispose()
  }
}

$crmCopies = @(
  @{ Src = "crm-perfiles-light.png"; Out = "crm-seguimiento.jpg" },
  @{ Src = "crm-links-light.png"; Out = "crm-links.jpg" },
  @{ Src = "crm-vinculo-light-opt.png"; Out = "crm-vinculo.jpg" }
)

foreach ($item in $crmCopies) {
  $src = Join-Path $registroAssets $item.Src
  $out = Join-Path $projectsDir $item.Out
  Compress-ImageFile -InputPath $src -OutputPath $out -MaxW $MaxWidth -Q $Quality | Out-Null
}

$pngFiles = Get-ChildItem $projectsDir -Filter "*.png"
foreach ($png in $pngFiles) {
  $jpgPath = Join-Path $projectsDir ($png.BaseName + ".jpg")
  Compress-ImageFile -InputPath $png.FullName -OutputPath $jpgPath -MaxW $MaxWidth -Q $Quality | Out-Null
}

Write-Host "Done compressing project images."
