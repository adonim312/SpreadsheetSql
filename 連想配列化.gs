/**
* 配列を連想配列化する。
*
* @param {array} array
* @param {array} keys
* @return {array} key-value mapped
*/
function setRowToHash_( array, keys ) {
  var hashList = [];
  if ( array ) {
    for ( var i = 0; i < array.length; i++ ) {
      var hash = {};
      array[i].forEach(
        function( value, i ) {
          hash[keys[i]] = value;
        }
      )
      hashList.push( hash );
    }
  }
  return hashList;
}
