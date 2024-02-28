import MainScrollContainer from '@/containers/MainScrollContainer';
import PageHeader from '@/content/PageHeader';
import QrCode from '@/content/QrCode';

export default () => {
  return (
    <MainScrollContainer>
      <PageHeader label="QR Code" />
      <QrCode />
    </MainScrollContainer>
  );
};
