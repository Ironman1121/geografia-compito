# Final stable download script using Pexels URLs which are very reliable.
$ErrorActionPreference = "Stop"
$publicDir = "public\images"
if (!(Test-Path $publicDir)) { New-Item -ItemType Directory -Path $publicDir }

$images = @{
    "roma.jpg" = "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "firenze.jpg" = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "venezia.jpg" = "https://images.pexels.com/photos/584299/pexels-photo-584299.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "milano.jpg" = "https://images.pexels.com/photos/8141386/pexels-photo-8141386.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "amalfi.jpg" = "https://images.pexels.com/photos/1036430/pexels-photo-1036430.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "matera.jpg" = "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=1600"
    "sicilia.jpg" = "https://images.pexels.com/photos/17698305/pexels-photo-17698305.jpeg?auto=compress&cs=tinysrgb&w=1600"
    
    "g1.jpg" = "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g2.jpg" = "https://images.pexels.com/photos/2827116/pexels-photo-2827116.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g3.jpg" = "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g4.jpg" = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g5.jpg" = "https://images.pexels.com/photos/2676587/pexels-photo-2676587.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g6.jpg" = "https://images.pexels.com/photos/3182452/pexels-photo-3182452.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g7.jpg" = "https://images.pexels.com/photos/584299/pexels-photo-584299.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g8.jpg" = "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g9.jpg" = "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g10.jpg" = "https://images.pexels.com/photos/8141386/pexels-photo-8141386.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g11.jpg" = "https://images.pexels.com/photos/1010646/pexels-photo-1010646.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g12.jpg" = "https://images.pexels.com/photos/2798835/pexels-photo-2798835.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g13.jpg" = "https://images.pexels.com/photos/1036430/pexels-photo-1036430.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g14.jpg" = "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g15.jpg" = "https://images.pexels.com/photos/3562473/pexels-photo-3562473.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g16.jpg" = "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g17.jpg" = "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g18.jpg" = "https://images.pexels.com/photos/1154502/pexels-photo-1154502.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g19.jpg" = "https://images.pexels.com/photos/17698305/pexels-photo-17698305.jpeg?auto=compress&cs=tinysrgb&w=800"
    "g20.jpg" = "https://images.pexels.com/photos/17698305/pexels-photo-17698305.jpeg?auto=compress&cs=tinysrgb&w=800"
}

$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

foreach ($name in $images.Keys) {
    $dest = Join-Path $publicDir $name
    if (Test-Path $dest) {
        Remove-Item $dest -Force
    }
    
    Write-Host "Downloading $name..."
    try {
        Invoke-WebRequest -Uri $images[$name] -OutFile $dest -UserAgent $ua
        Start-Sleep -Milliseconds 200
    } catch {
        Write-Host "Failed $name: $($_.Exception.Message)"
    }
}

Write-Host "Done!"
