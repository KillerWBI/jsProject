


export function BLoadmore(page, data) {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (!loadMoreBtn || !data || typeof data.total !== 'number') return;

  const shownItems = page * 12;
  const totalItems = data.total;


  const shouldShow = shownItems < totalItems;

  if (shouldShow && loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.remove('is-hidden');
  } else if (!shouldShow && !loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.add('is-hidden');
  }
}

