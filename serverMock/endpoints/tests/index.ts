({

  get({ slashParams, queryParams }: Params) {
    return store['tests'];
  },

  post({ slashParams, queryParams, body }: Params) {
    return 'Ok';
  },

  put({ slashParams, queryParams, body }: Params) {
    return 'Ok';
  },

  patch({ slashParams, queryParams, body }: Params) { // TODO: сделать так, чтобы этот метод тоже работал
    return 'Ok';
  },

  delete({ slashParams, queryParams }: Params) {
    return 'Ok';
  }

})