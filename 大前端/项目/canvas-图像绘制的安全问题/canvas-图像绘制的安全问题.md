canvas-ͼ����Ƶİ�ȫ���� Ŀ¼
[TOC]
***



# ͼ��������ȫ����

- ���Ҫ�������������ȡ�������罻�����ϵ�ͼƬ�����߶�ԭ��ͼ���м���
- `canvas`������Ʋ������Լ���ͼ��(������)��������ͨ��`canvas API`������޸�ͼ��

# ��ͼ��ȫ���Ƶ�ԭ��

- `canvas`��`origin-clean`��־λ��Ĭ��Ϊ`true`
- ���ʹ����`drawImage()`�������������ͼ��`origin-clean`����`false`
- �����`origin-clean: false`��`canvas`�ϵ���`toDataURL(), getImageData()`��������������ᱨ��`SECURITY_ERR`

# �ƹ���ȫ����

- `Chrome`�����������룺`--allow-file-access-from-files`
- `FireFox`��`netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");`

