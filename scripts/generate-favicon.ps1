Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$sourcePath = Join-Path $PSScriptRoot "..\public\assets\profile\pas-foto.webp"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

$uri = New-Object System.Uri($sourcePath)
$decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($uri, [System.Windows.Media.Imaging.BitmapCreateOptions]::None, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
$frame = $decoder.Frames[0]

$w = $frame.PixelWidth
$h = $frame.PixelHeight
Write-Host "Source dimensions: $w x $h"

# Square centered crop focused on the face (slightly upper-centered for pas-foto)
$cropSize = [Math]::Min($w, $h)
$cropX = [Math]::Max(0, [int](($w - $cropSize) / 2))
$cropY = [Math]::Max(0, [int](($h - $cropSize) * 0.22))

if ($cropY + $cropSize -gt $h) {
    $cropY = $h - $cropSize
}

Write-Host "Cropping rect: X=$cropX, Y=$cropY, Size=$cropSize"

$rect = New-Object System.Windows.Int32Rect($cropX, $cropY, $cropSize, $cropSize)
$cropped = New-Object System.Windows.Media.Imaging.CroppedBitmap($frame, $rect)

function SaveResizedPng($bitmap, $targetWidth, $targetHeight, $outPath) {
    $scaleX = $targetWidth / $bitmap.PixelWidth
    $scaleY = $targetHeight / $bitmap.PixelHeight
    $transform = New-Object System.Windows.Media.ScaleTransform($scaleX, $scaleY)
    $transformedBitmap = New-Object System.Windows.Media.Imaging.TransformedBitmap($bitmap, $transform)
    
    $encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($transformedBitmap))
    
    $stream = [System.IO.File]::Create($outPath)
    $encoder.Save($stream)
    $stream.Close()
    Write-Host "Saved: $outPath ($targetWidth x $targetHeight)"
}

$destIcon = Join-Path $PSScriptRoot "..\src\app\icon.png"
$destAppleIcon = Join-Path $PSScriptRoot "..\src\app\apple-icon.png"
$destPublicFavicon = Join-Path $PSScriptRoot "..\public\favicon.png"

SaveResizedPng $cropped 192 192 $destIcon
SaveResizedPng $cropped 180 180 $destAppleIcon
SaveResizedPng $cropped 64 64 $destPublicFavicon
