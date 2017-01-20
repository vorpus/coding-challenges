$(() => {
  startFetch();

  $('.user-tables').on('mousedown', (e) => {
    const el = e.target.parentElement;
    if ($(el).hasClass('user-row')) {
      state.dragged = el;
      beginDrag(el);
    }
  });


});

const state = {};

function startFetch() {
  for (let i = 1; i <= 2; i++) {
    getUsers(i);
  }
}

function getUsers(id) {
  $.ajax({
    url:`https://jsonplaceholder.typicode.com/users/${id}`,
    method:'GET',
  }).then(
    success => {
      receiveUsers(success);
      fetchAlbums(id);
    },
    error => console.log('error fetching users')
  );
}

function receiveUsers(users) {
  state[users.id] = users;
  $('.user-tables').append(
    $(`<div class='user-single user-${users.id}' data='${users.id}'>`)
      .append(`<div class='user-name'>${users.name}'s collection</div>`)
      .append(`<div class='rows user-rows-${users.id}'></div>`)
  );
}

function fetchAlbums(userId) {
  $.ajax({
    url:`https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    method:'GET',
  }).then(
    success => receiveAlbums(userId, success),
    error => console.log(`error fetching albums for user ${userId}`)
  );
}

function receiveAlbums(userId, albums) {
  const albumsO = {};
  albums.forEach( (alb) => {
    albumsO[alb.id] = alb;
  });
  state[userId].albums = albumsO;

  renderAlbums(userId);
}

function renderAlbums(userId) {
  const albumsO = state[userId].albums;
  $(`.user-rows-${userId}`).empty()
  Object.keys(albumsO).forEach( (key) => {
    $(`.user-rows-${userId}`).append(
      $(`<div class='user-row' data='${albumsO[key].id}'>`)
        .append(`<div class='row-id'>${albumsO[key].id}</div>`)
        .append(`<div class='row-title'>${albumsO[key].title}</div>`)
    );
  });
}

function removeDragged() {
  const draggedTable = $(state.dragged).closest('.user-single')[0]
  const fromUser = parseInt(draggedTable.attributes.data.value);
  const albumId = parseInt(state.dragged.attributes.data.value);
  $(state.dragged).remove();
  delete state[fromUser].albums[albumId];
  state.dragged = null;
}

function receiveAlbum(userId, album) {
  state[userId].albums[album.id] = album;
  renderAlbums(userId);
}

function giveAlbum(albumId, userId) {
  $.ajax({
    url:`https://jsonplaceholder.typicode.com/albums/${albumId}`,
    method: 'PATCH',
    data: {
      'userId':userId
    }
  }).then(
    success => {
      receiveAlbum(success.userId, success);
    }
  );
}

function beginDrag(target) {

  $(document).on('mousemove', (e) => {
    $(target).css({
      'position':'absolute',
      'left':`${e.clientX+30}px`,
      'top':`${e.clientY}px`,
      'opacity':'0.7',
      'box-shadow': '3px 3px rgba(0, 0, 0, 0.5)'
    });
  });

  $(document).on('mouseup', (e) => {
    $(document).off('mousemove');
    const newTable = $(e.target).closest('.user-single')[0];
    if (state.dragged && newTable) {
      const newUser = parseInt(newTable.attributes.data.value);
      const oldAlbumId = parseInt(state.dragged.attributes.data.value);
      removeDragged();
      giveAlbum(oldAlbumId, newUser);
    } else {
      $(target).css({'position':'inherit','opacity':'1','box-shadow':'none'});
    }
  });

}
