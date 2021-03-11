import { Component, OnInit } from '@angular/core';
import { Contracts } from "../contracts";
// import Neon from "@cityofzion/neon-js";
import Neon, { api, wallet, tx, sc, rpc } from "@cityofzion/neon-js";
import { BindModel } from "./bindModel";
import { RpcUrls } from "../rpcUrl";




@Component({
  selector: 'app-factory-manager',
  templateUrl: './factory-manager.component.html',
  styleUrls: ['./factory-manager.component.css']
})
export class FactoryManagerComponent implements OnInit {

  rpcUrls = RpcUrls;
  nodeUrl = "http://localhost:60002"

  model: BindModel = {
    factoryContract: "0x" + Contracts.factoryContract,
    tokenA: "0x" + Contracts.tokenA.value,
    tokenB: "0x" + Contracts.tokenB.value,
    pairContract: "",
    pairContractAddress: ""
  };

  tokens = Contracts.tokens;
  txId = "";
  errorMessage = "";

  //私链neoscan地址,付gas时要用，不付不需要改
  // apiProvider = new api.neoscan.instance("http://128.1.61.238:34000/api/main_net");
  apiProvider = new api.neoscan.instance("https://api.neoscan.io/api/main_net");


  // const apiProvider = new api.neoscan.instance("http://128.1.61.238:34444/api/main_net");

  //From
  // normalPrivateKey = "L2oYxEYhM2rXhnz74mVEzVRfFieu79RN77po2VPRKfVuyPEjotUH"; //debug wallet：ARpSm3ExT2ZRhR3faqZKEAfFQwyceAib9L
  normalPrivateKey = "L4EKpKPVcwq26xR6T4ierUj9pA8rLMiZAhhzru2qYiFNiCzgNgGU"; //wallet1: AZaCs7GwthGy9fku2nFXtbrdKBRmrUQoFP
  // normalPrivateKey = "L3KMJNhui75G3NuZXYrgmoD5CSo1JkoW95d1xVK5rPJKJwPryoWk"; //wallet1: AJ5kbv2QJ1eZG3ESYynrETcUyomsG2iJZp

  adminAccount = new wallet.Account(this.normalPrivateKey);



  constructor() {
  }

  ngOnInit(): void {
  }

  resetError() {
    this.errorMessage = "";
  }

  /**
   * 查询交易对合约
   * @param tokenA
   * @param tokenB
   */
  async onShow(tokenA: string, tokenB: string): Promise<void> {
    this.resetError();
    this.model.pairContract = "";
    console.log(tokenA, tokenB);

    let token0 = sc.ContractParam.hash160(tokenA.replace("0x", ""));
    let token1 = sc.ContractParam.hash160(tokenB.replace("0x", ""));
    const sb = Neon.create.scriptBuilder();
    sb.emitAppCall(Contracts.factoryContract, "getExchangePair", [token0, token1]);
    // Returns a hexstring
    const script = sb.str;
    console.log(script);

    var response = await rpc.Query.invokeScript(script).execute(this.nodeUrl);

    console.log(response);

    if (response.result.state == "HALT" && response.result.stack[0].value) {
      let p = Neon.u.reverseHex(response.result.stack[0].value);
      let pairContract = "0x" + p;
      this.model.pairContract = pairContract;
      // var address=new wallet.Account(pairContract);

      this.model.pairContractAddress = wallet.getAddressFromScriptHash(p);

    } else {
      this.errorMessage = JSON.stringify(response);
    }
  }

  /**
   * 重置交易对绑定合约
   */
  async onReset(): Promise<void> {
    try {

      this.resetError();

      let addGas = 0;//附加gas


      let token0 = sc.ContractParam.hash160(this.model.tokenA.replace("0x", ""));
      let token1 = sc.ContractParam.hash160(this.model.tokenB.replace("0x", ""));
      let pairContract = sc.ContractParam.hash160(this.model.pairContract.replace("0x", ""));


      const sb = Neon.create.scriptBuilder();
      sb.emitAppCall(Contracts.factoryContract, "removeExchangePair", [token0, token1]);
      sb.emitAppCall(Contracts.factoryContract, "createExchangePair", [token0, token1, pairContract]);
      // Returns a hexstring
      const script = sb.str;
      console.log(script);

      const config = {
        api: this.apiProvider, // The API Provider that we rely on for balance and rpc information
        url: this.nodeUrl,
        account: this.adminAccount, // The sending Account
        script: script, // The Smart Contract invocation script
        gas: addGas, //This is additional gas paying to system fee.
        fees: 0 //Additional gas paying for network fee(prioritizing, oversize transaction).
      };

      Neon.doInvoke(config)
        .then(config => {
          console.log("\n\n--- Response ---");
          console.log(config.response);
          if (config.response.result) {
            this.txId = config.response.txid;
          }
        })
        .catch(config => {
          console.log(config);
          this.errorMessage = config;
        });
    } catch (error) {
      this.errorMessage = error;
    }

  }


}
