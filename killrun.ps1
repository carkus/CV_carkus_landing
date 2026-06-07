Get-NetTCPConnection -LocalPort 5107 -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess |
    Where-Object { $_ -ne 0 } |
    Sort-Object -Unique |
    ForEach-Object { Stop-Process -Id $_ -Force; Write-Host "Killed $_" }

dotnet watch
