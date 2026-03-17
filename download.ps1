$ErrorActionPreference = "Stop"
$publicDir = "public\images"
if (!(Test-Path $publicDir)) { New-Item -ItemType Directory -Path $publicDir }

$imageList = @(
    @{ name = "roma.jpg"; title = "File:Colosseo_2020.jpg"; width = 1600 },
    @{ name = "firenze.jpg"; title = "File:Firenze_-_Santa_Maria_del_Fiore.jpg"; width = 1600 },
    @{ name = "venezia.jpg"; title = "File:View_of_the_Grand_Canal_from_Rialto_to_Ca%27Foscari.jpg"; width = 1600 },
    @{ name = "milano.jpg"; title = "File:Milan_Cathedral_from_Piazza_del_Duomo.jpg"; width = 1600 },
    @{ name = "amalfi.jpg"; title = "File:Positano_Sunset.JPG"; width = 1600 },
    @{ name = "matera.jpg"; title = "File:Matera_-_View_from_Sant%27Agostino.jpg"; width = 1600 },
    @{ name = "sicilia.jpg"; title = "File:Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg"; width = 1600 },
    
    @{ name = "g1.jpg"; title = "File:Colosseum_in_Rome%2C_Italy_-_April_2007.jpg"; width = 800 },
    @{ name = "g2.jpg"; title = "File:Piazza_Navona_%28Rome%29_at_night.jpg"; width = 800 },
    @{ name = "g3.jpg"; title = "File:Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg"; width = 800 },
    @{ name = "g4.jpg"; title = "File:Cattedrale_di_Santa_Maria_del_Fiore_%E2%80%93_Il_Duomo_di_Firenze.jpg"; width = 800 },
    @{ name = "g5.jpg"; title = "File:Ponte_Vecchio_from_Ponte_alle_Grazie.jpg"; width = 800 },
    @{ name = "g6.jpg"; title = "File:Michelangelo%27s_David_2015.jpg"; width = 800 },
    @{ name = "g7.jpg"; title = "File:Venezia_Canal_Grande_Ponte_di_Rialto.jpg"; width = 800 },
    @{ name = "g8.jpg"; title = "File:Gondola_Ride.jpg"; width = 800 },
    @{ name = "g9.jpg"; title = "File:Piazza_San_Marco_%28Venice%29_at_night-msu-2021-6449-.jpg"; width = 800 },
    @{ name = "g10.jpg"; title = "File:Milan_Duomo_at_night.jpg"; width = 800 },
    @{ name = "g11.jpg"; title = "File:Galleria_Milano_%28179532365%29.jpeg"; width = 800 },
    @{ name = "g12.jpg"; title = "File:Naviglio_e_alzaia.jpg"; width = 800 },
    @{ name = "g13.jpg"; title = "File:Positano_Sunset.JPG"; width = 800 },
    @{ name = "g14.jpg"; title = "File:Amalfi_Coast_%28Italy%2C_October_2020%29_-_75_%2850558355441%29.jpg"; width = 800 },
    @{ name = "g15.jpg"; title = "File:Ravello-coastline.jpg"; width = 800 },
    @{ name = "g16.jpg"; title = "File:Matera_boenisch_nov_2005.jpg"; width = 800 },
    @{ name = "g17.jpg"; title = "File:Matera_-_View_from_Sant%27Agostino.jpg"; width = 800 },
    @{ name = "g18.jpg"; title = "File:Taormina_Theatre.jpg"; width = 800 },
    @{ name = "g19.jpg"; title = "File:Mt_Etna_and_Catania1.jpg"; width = 800 },
    @{ name = "g20.jpg"; title = "File:Cefalu-bjs2007-01.jpg"; width = 800 }
)

$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

foreach ($img in $imageList) {
    $dest = Join-Path $publicDir $img.name
    if (Test-Path $dest) {
        $size = (Get-Item $dest).Length
        if ($size -gt 1000) {
            Write-Host "Skipping $($img.name)"
            continue
        }
    }
    
    Write-Host "Fetching URL for $($img.name)..."
    $apiUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=$($img.title)&prop=imageinfo&iiprop=url&iiurlwidth=$($img.width)&format=json"
    try {
        $res = Invoke-RestMethod -Uri $apiUrl -UserAgent $ua
        $pages = $res.query.pages
        $pageId = ($pages.PSObject.Properties.Name)[0]
        if ($pageId -eq "-1") {
            Write-Error "Page not found for $($img.name)"
            continue
        }
        $thumbUrl = $pages.$pageId.imageinfo[0].thumburl
        
        Write-Host "Downloading $($img.name) from $thumbUrl..."
        Invoke-WebRequest -Uri $thumbUrl -OutFile $dest -UserAgent $ua
        Start-Sleep -Milliseconds 300
    } catch {
        Write-Host "Failed $($img.name): $($_.Exception.Message)"
        Start-Sleep -Seconds 1
    }
}

Write-Host "Done!"
