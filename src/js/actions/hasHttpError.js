export default function checkHttpError(json) {
  if(!json) return Promise.resolve(true)
  if(json.httpStatus === 401) return new Promise(()=>{})
  return Promise.resolve(json.httpStatus > 399)
}
