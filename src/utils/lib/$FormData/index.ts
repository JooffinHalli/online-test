import { Obj } from "../Obj";
import { _ } from "../_";

export namespace $FormData {

  export const appendAsJSON = <T extends Record<string, any>>(obj: T) => {
    const formdata = new FormData();
    Obj.forIn(obj, (k) => formdata.append(k.toString(), _.toBlob(obj[k])));
    return formdata;
  }

}