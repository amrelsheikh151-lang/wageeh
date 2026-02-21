[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("d:\wageh presentation\otc.docx")

$output = @()

$tableCount = $doc.Tables.Count
$output += "Number of tables: $tableCount"

for ($t = 1; $t -le $tableCount; $t++) {
    $table = $doc.Tables.Item($t)
    $rows = $table.Rows.Count
    $cols = $table.Columns.Count
    $output += "=== TABLE $t : $rows rows x $cols cols ==="
    for ($r = 1; $r -le $rows; $r++) {
        $line = ""
        for ($c = 1; $c -le $cols; $c++) {
            try {
                $cellText = $table.Cell($r, $c).Range.Text
                $cellText = $cellText.TrimEnd([char]13, [char]7)
                $line += $cellText + " | "
            } catch {
                $line += " | "
            }
        }
        $output += $line
    }
}

$output | Out-File -FilePath "d:\wageh presentation\otc_content.txt" -Encoding UTF8

$doc.Close($false)
try { $word.Quit() } catch {}
