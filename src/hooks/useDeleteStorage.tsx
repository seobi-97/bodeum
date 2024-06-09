const useDeleteAll = () => {
  window.sessionStorage.removeItem("userInfo");
  window.sessionStorage.removeItem("chat");
  window.sessionStorage.removeItem("chatShare");
  window.sessionStorage.removeItem("character");
};
const useDeleteUser = () => {
  window.sessionStorage.removeItem("userInfo");
};

const useDeleteChat = () => {
  window.sessionStorage.removeItem("chat");
};

const useDeleteChatShare = () => {
  window.sessionStorage.removeItem("chatShare");
};

export { useDeleteAll, useDeleteUser, useDeleteChat, useDeleteChatShare };
