import { from } from 'rxjs';
import * as Neon from "@cityofzion/neon-js";

export namespace Contracts {
  export const factoryContract: string = 'f8613c1ad870e6e05ec0caffdb276e37389f091b';
  export const routerContract = "d40d3133f30fc9f8c76c10cff40370be3320f0bb";

  export const exchangePairAB = Neon.sc.ContractParam.hash160(
    "d81993c8b8935bde7e15af96792c606edb6d4e48"
  );
  export const exchangePairBC = Neon.sc.ContractParam.hash160(
    '59899af67bab7dea68cebe31eb22ab13bd8ba508'
  );

  export const tokenA = Neon.sc.ContractParam.hash160(
    "ffd7c6a529591ef234999336f371cb82601eadcb"
  );
  export const tokenB = Neon.sc.ContractParam.hash160(
    "d40f5992028cd7834e908b06478a9ac70f49767c"
  );
  export const tokenC = Neon.sc.ContractParam.hash160(
    "b9ea5db6b1340743dfea384ae3c8ae2c41e04bf8"
  );
  export const tokenD = Neon.sc.ContractParam.hash160(
    "9efe829a19355ef4edfa805f731ed431af804118"
  );

  export const tokens = [
    { name: "tokenA", value: "0x" + tokenA.value },
    { name: "tokenB", value: "0x" + tokenB.value },
    { name: "tokenC", value: "0x" + tokenC.value },
    { name: "tokenD", value: "0x" + tokenD.value },

  ]
}
