/**
* 項目取得
*
* @param {string} tableId テーブルファイルID
* @return {array} テーブル情報
*/
function getTableItems_( tableId ) {
  var file = SpreadsheetApp.openById( tableId );
  var sheet = file.getSheetByName( 'TableInfo' );
  var list = sheet.getRange( 3, 2, sheet.getLastRow() - 2, 1 ).getValues();
  return list;
}
