export function makeCancelable(promise) {
  let hasCanceled = false;
  console.log(`hasCanceled1: ${hasCanceled}`);
  const wrappedPromise = new Promise((resolve, reject) => {
    console.log(`hasCanceled2: ${hasCanceled}`);
    promise.then(res => {
      console.log(`hasCanceled3: ${hasCanceled}`);
      console.log("res");
      console.log(res);
      return hasCanceled ? reject({ isCanceled: true }) : resolve(res);
    });
    promise.catch(error => {
      console.log(`hasCanceled4: ${hasCanceled}`);
      console.log("error");
      console.log(error);
      return hasCanceled ? reject({ isCanceled: true }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
}
