// Safely access Telegram WebApp (undefined outside Telegram)
const tg = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp
  ? window.Telegram.WebApp
  : null;

export function useTelegram() {
    const onClose = () => {
        if (tg) {
            tg.close();
        }
    }

    const onToggleButton = () => {
        if (!tg) return;
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }

    return {
        tg,
        user: tg?.initDataUnsafe?.user,
        onClose,
        onToggleButton
    }
}