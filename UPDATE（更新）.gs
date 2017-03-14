/**
* 検索条件に併せてリストを更新する
* 
* @param {array} tableId ファイルID
* @param {array} items 変更項目 { [変更項目1,変更値1],[変更項目2,変更値2],・・・} 
* @param {array} condition 検索条件 { [検索項目1,検索条件1,検索値1],[検索項目2,検索条件2,検索値2],・・・} 
* @return result 結果
*/
function update( tableId, items, condition ) {
  var maxRow = 5000;
  var file = SpreadsheetApp.openById( tableId );
  var list = getTableList( tableId, condition );
  var key = getTableItems_( tableId )
  try {
    for ( var i = 0; i < list.length; i++ ) {
      var sheet = file.getSheetByName( Math.ceil( list[i]['no'] / maxRow ));
      for ( var j = 0; j < items.length; j++ ) {
        for ( var k = 0; k < key.length; k++ ) {
          if ( items[j][0] == key[k] ) {
            sheet.getRange( list[i]['no'] - ( Math.floor( list[i]['no'] / maxRow ) * maxRow ) + 2, k + 1 ).setValue( items[j][1] );
          }
        } 
      }
    } 
  } catch ( e ) {
    return 'NG';
  }
  return 'OK';
}
