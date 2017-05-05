export default function(location){
  var pathParts = location.pathname.split('/')
  if(pathParts.length < 3) return null
  return {id: pathParts[1], filing: pathParts[2]}
 }
