import { useContext } from 'react';
import RCContext from '../context/RCInstance';
import { useGoogleLogin } from './useGoogleLogin';
import { useToastStore, useUserStore, totpModalStore } from '../store';
import { useToastBarDispatch } from './useToastBarDispatch';

export const useRCAuth4Google = (GOOGLE_CLIENT_ID) => {
  const { signIn } = useGoogleLogin(GOOGLE_CLIENT_ID);
  const { RCInstance } = useContext(RCContext);
  const setIsTotpModalOpen = totpModalStore(
    (state) => state.setIsTotpModalOpen
  );
  const setUserAvatarUrl = useUserStore((state) => state.setUserAvatarUrl);
  const setAuthenticatedUserUsername = useUserStore(
    (state) => state.setUsername
  );
  const setIsUserAuthenticated = useUserStore(
    (state) => state.setIsUserAuthenticated
  );
  const toastPosition = useToastStore((state) => state.position);
  const dispatchToastMessage = useToastBarDispatch();

  const handleGoogleLogin = async (acsCode) => {
    try {
      const res = await RCInstance.googleSSOLogin(signIn, acsCode);
      if (res === undefined) {
        dispatchToastMessage({
          type: 'error',
          message:
            'Something went wrong. Please check your TOTP and try again.',
          position: toastPosition,
        });
      } else {
        if (res.error === 'totp-required') {
          setIsTotpModalOpen(true);
          dispatchToastMessage({
            type: 'info',
            message: 'Please Open your authentication app and enter the code.',
            position: toastPosition,
          });
        }
        if (res.status === 'success') {
          setUserAvatarUrl(res.me.avatarUrl);
          setAuthenticatedUserUsername(res.me.username);
          setIsUserAuthenticated(true);
          setIsTotpModalOpen(false);
          dispatchToastMessage({
            type: 'success',
            message: 'Successfully logged in',
            position: toastPosition,
          });
        } else if (res.status === 'error' && !(res.error === 'totp-required')) {
          dispatchToastMessage({
            type: 'error',
            message: 'Something wrong happened',
            position: toastPosition,
          });
        }
      }
    } catch (e) {
      console.error('A error occurred while setting up user', e);
    }
  };

  const handleLogout = async () => {
    const res = await RCInstance.logout();
    if (res.status === 'success') {
      setIsUserAuthenticated(false);
      setUserAvatarUrl('');
      dispatchToastMessage({
        type: 'success',
        message: 'Successfully logged out',
        position: toastPosition,
      });
    }
  };

  return {
    handleGoogleLogin,
    handleLogout,
  };
};
