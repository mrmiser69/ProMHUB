export function getTelegramUserId() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
}