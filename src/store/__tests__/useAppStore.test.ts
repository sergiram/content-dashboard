import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().clearChannel();
  });

  it('initially has empty state', () => {
    const state = useAppStore.getState();
    expect(state.selectedChannel).toBeNull();
    expect(state.youtubeVideos).toEqual([]);
    expect(state.isLoadingChannel).toBe(false);
  });

  it('updates search modal visibility', () => {
    const { setSearchModalOpen } = useAppStore.getState();

    setSearchModalOpen(true);
    expect(useAppStore.getState().isSearchModalOpen).toBe(true);

    setSearchModalOpen(false);
    expect(useAppStore.getState().isSearchModalOpen).toBe(false);
  });

  it('updates selected video and modal state', () => {
    const mockVideo = { id: '1', title: 'Test Video' } as any;
    const { setSelectedVideo, setVideoModalOpen } = useAppStore.getState();

    setSelectedVideo(mockVideo);
    setVideoModalOpen(true);

    expect(useAppStore.getState().selectedVideo).toEqual(mockVideo);
    expect(useAppStore.getState().isVideoModalOpen).toBe(true);
  });
});
