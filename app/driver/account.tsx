import { useEffect } from 'react';
import { View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { gotoRootPage } from '$lib/navigation/navigate';
import fetchUserMe from '$lib/services/users/fetchUserMe';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { selectedUserState } from '$lib/store/user';
import FlexContentContainer from '@/containers/FlexContentContainer';
import MainScrollContainer from '@/containers/MainScrollContainer';
import SurfaceContainer from '@/containers/SurfaceContainer';
import PageHeader from '@/content/PageHeader';
import SurfaceHeader from '@/content/SurfaceHeader';
import DisabledInput from '@/inputs/DisabledInput';

export default () => {
  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  useEffect(() => {
    const fetchUserController = new AbortController();

    setIsLoading(true);
    fetchUserMe(fetchUserController)
      .then((user) => {
        setSelectedUser(user);
      })
      .catch((error: Error) => {
        if (error.message === 'Forbidden') return gotoRootPage();
        setAlertType('error');
        setAlertText('USER: ' + error.message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      fetchUserController.abort();
    };
  }, []);

  return (
    <MainScrollContainer>
      <View className="flex flex-col items-center">
        <PageHeader label="Account" />
        <SurfaceContainer>
          <SurfaceHeader label="Account Information" />
          <FlexContentContainer>
            <DisabledInput
              value={selectedUser?.firstName ?? ''}
              label="First Name"
              placeholder="First Name"
            />
            <DisabledInput
              value={selectedUser?.lastName ?? ''}
              label="Last Name"
              placeholder="Last Name"
            />
            <DisabledInput value={selectedUser?.email ?? ''} label="Email" placeholder="Email" />
            <DisabledInput
              value={selectedUser?.phoneNumber ?? ''}
              label="Phone Number"
              placeholder="Phone Number"
            />
            <DisabledInput
              value={selectedUser?.birth_date ?? ''}
              label="Date of Birth"
              placeholder="Date of Birth"
            />
            <DisabledInput
              value={selectedUser?.address ?? ''}
              label="Address"
              placeholder="Address"
            />
          </FlexContentContainer>
        </SurfaceContainer>
      </View>
    </MainScrollContainer>
  );
};
