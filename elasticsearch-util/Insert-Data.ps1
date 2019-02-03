Get-ChildItem ".\esdata" | ForEach-Object {
    $fileName = $_.FullName
    Invoke-RestMethod "https://search-elasticsearch-poc-n4qkkr7rhevhba6wggugt5kvom.us-east-2.es.amazonaws.com/client/clientInformation/_bulk?pretty" -Method Post -ContentType 'application/x-ndjson' -InFile $fileName
}