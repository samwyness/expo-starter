export const mockPlatform = (os: string, version?: string | number) => {
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
    ...jest.requireActual('react-native/Libraries/Utilities/Platform'),
    OS: os,
    select: (osList: Record<string, unknown>) => osList[os],
    Version: version,
  }));
};
