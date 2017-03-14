/**
* 検索条件に併せてリストを絞り込む
* 
* @param {array} tableId ファイルID
* @param {array} condition 検索条件 { [検索項目1,検索条件1,検索値1],[検索項目2,検索条件2,検索値2],・・・} 
* @return {array} テーブル情報
*/
function select( tableId, condition ) {
  var file = SpreadsheetApp.openById( tableId );
  var list = [];
  var keys = getTableItems_( tableId );
  var i = 1;
  while ( file.getSheetByName( i ) ) {
    var sheet = file.getSheetByName( i );
    list = list.concat( sheet.getRange( 3, 1, sheet.getLastRow() - 2, sheet.getLastColumn() ).getValues() );
    i++;
  }
  list = setRowToHash_( list, keys );
  var refineList = [];
  for ( var i = 0; i < list.length; i++ ) {
    A:for ( var j = 0; j < condition.length; j++ ) {
      if ( condition[j][1] == '=' ) {
        // 検索値と同じ場合
        if ( list[i][condition[j][0]] != condition[j][2] ) {
          break A;
        }
      } else if ( condition[j][1] == '!=' ) {
        //  検索値と異なる場合
        if ( list[i][condition[j][0]] == condition[j][2] ) {
          break A;
        }
      } else if ( condition[j][1] == '<' ) {
        // 検索値とより小さい場合
        if ( list[i][condition[j][0]] >= condition[j][2] ) {
          break A;
        }
      } else if ( condition[j][1] == '>' ) {
        // 検索値とより大きい場合
        if ( list[i][condition[j][0]] <= condition[j][2] ) {
          break A;
        }
      } else if ( condition[j][1] == '<=' ) {
        // 検索値以下の場合
        if ( list[i][condition[j][0]] > condition[j][2] ) {
          break A;
        }
      } else if ( condition[j][1] == '>=' ) {
        // 検索値以上の場合
        if ( list[i][condition[j][0]] < condition[j][2] ) {
          break A;
        }
      }
      // 全ての条件を満たしていれば吐き出しリストに追加
      if ( condition.length -1 == j ) {
        refineList.push( list[i] );
      }
    }
  }
  return refineList;
}
