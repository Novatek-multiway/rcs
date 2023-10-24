import { useRequest } from "ahooks";
import { postLogin } from "apis";
import { useGlobalStore } from "store";

/**
 * A hook for handling authentication.
 *
 * @returns {Object} An object containing the `useLogin` function and a `loading` flag.
 */
const useAuth = () => {
  const { setUserInfo } = useGlobalStore();
  // 请求登录
  const { loading, runAsync: login } = useRequest(postLogin, {
    manual: true,
  });

  /**
   * Executes the login process.
   *
   * @returns {Promise<void>} A promise that resolves when the login process is completed.
   */
  const globalLogin = async () => {
    const res = await login({
      userName: "test",
      passWord: "123456",
      jwtToken: "string",
      refreshToken: "string",
      hash: "string",
      code: "1234",
      uuid: "81dc9bdb52d04dc20036dbd8313ed055",
    });
    if (res) {
      res.data && setUserInfo(res.data);
    }
  };

  return {
    globalLogin,
    loading,
  };
};

export default useAuth;
