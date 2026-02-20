# Image Optimization Script for Glaze Properties
# This script compresses hero images to reduce load times

Write-Host "Glaze Properties Image Optimization Script" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Check if images exist
$heroImage = "img/set-designer-work-indoors.jpg"
$servicesImage = "img/african-american-lady-safety-helmet-eyeglasses-near-building-construction.jpg"

if (Test-Path $heroImage) {
    $originalSize = (Get-Item $heroImage).Length / 1MB
    Write-Host "Original hero image size: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Yellow

    # Note: ImageMagick or similar tool needed for compression
    Write-Host "To compress images, use one of these methods:" -ForegroundColor Cyan
    Write-Host "1. Online tools: tinypng.com, compressjpeg.com, or iloveimg.com" -ForegroundColor White
    Write-Host "2. Install ImageMagick: choco install imagemagick" -ForegroundColor White
    Write-Host "3. Use PowerShell with .NET Image tools" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    Write-Host "Recommended target size: < 500KB for hero images" -ForegroundColor Green
    Write-Host "Current size: $([math]::Round($originalSize, 2)) MB - Too large!" -ForegroundColor Red
} else {
    Write-Host "Hero image not found: $heroImage" -ForegroundColor Red
}

if (Test-Path $servicesImage) {
    $servicesSize = (Get-Item $servicesImage).Length / 1MB
    Write-Host "Original services image size: $([math]::Round($servicesSize, 2)) MB" -ForegroundColor Yellow
}

Write-Host "" -ForegroundColor White
Write-Host "Manual compression steps:" -ForegroundColor Green
Write-Host "1. Visit https://tinypng.com/" -ForegroundColor White
Write-Host "2. Upload both hero images" -ForegroundColor White
Write-Host "3. Download compressed versions" -ForegroundColor White
Write-Host "4. Replace original files" -ForegroundColor White
Write-Host "5. Target quality: 80-90% for good balance of size/quality" -ForegroundColor White