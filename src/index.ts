import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";

const WEB_SOCKET = "ws://localhost:9944";
// setTimeout等待一段时间
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//连接Substrate
const connectSubstrate = async () => {
  const provider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({ provider, types: {} });
  await api.isReady;
  console.log("连接成功");
  return api;
};

// 监听Event并打印
const subscribeEvent = async (api: ApiPromise) => {
  await api.query.system.events((events) => {
    // 遍历所有事件记录
    events.forEach((record) => {
      const { event, phase } = record;

      const eventName = `${event.section}:${
        event.method
      }:: (phase=${phase.toString()})`;
      // 打印事件信息
      console.log("eventName", eventName);
    });
  });
};

const main = async () => {
  const api = await connectSubstrate();
  await subscribeEvent(api);
};

main();
