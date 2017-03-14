/**
* テーブルに新規情報を登録する
*
* @param {string} tableId ファイルID
* @param {array} list 入力情報
* @return result 結果
*/
function insert( tableId, list ) {
  var maxRow = 5000;
  var file = SpreadsheetApp.openById( tableId );
  var numTable = file.getSheets().length - 1;
  var sheet = file.getSheetByName( numTable );
  var lastRow = sheet.getLastRow();
  var limit = maxRow - lastRow + 2;
  if ( list.length > limit ) {
    var count = Math.ceil(( list.length - limit ) / 5000 );
    for ( var i = 0; i <= count; i++ ) {
      var addList = [];
      if ( i > 0 ) {
        for ( var j = 0; j < list.length - limit - ( 5000 * ( i - 1 )) ; j++ ) {
          addList.push( list[ j + limit + ( 5000 * ( i - 1 )) ] );
        }
        try {
          var sheetNew = sheet.copyTo( file );
          sheetNew.setName( numTable + i );
          sheetNew.getRange( 3, 1, sheetNew.getLastRow() - 2, sheetNew.getLastColumn() ).clear();
          sheetNew.getRange( 3, 1, addList.length, addList[0].length ).setValues( addList );
        } catch(e) {
          Logger.log( '登録に失敗しました。' );
          return 'NG';
        }
      } else {
        if ( limit > 0 ) {
          for ( var j = 0; j < limit; j++ ) {
            addList.push( list[j] );
          }
          try {
            sheet.getRange( lastRow + 1, 1, addList.length, addList[0].length ).setValues( addList );
          } catch(e) {
            Logger.log( '登録に失敗しました。' );
            return 'NG';
          }
        }
      }
    }
  } else {
    try {
      sheet.getRange( lastRow + 1, 1, list.length, list[0].length ).setValues( list );
    } catch(e) {
      Logger.log( '登録に失敗しました。' );
      return 'NG';
    }
  }
  return 'OK';
}
