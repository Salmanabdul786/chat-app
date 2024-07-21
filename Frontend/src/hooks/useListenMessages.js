import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3"
import useConversation from "../store/useConversation";

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMesage", (newMesage) => {
        newMesage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMesage]);
    });

    return () => socket?.off("newMesage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
