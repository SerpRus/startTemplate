import '../scss/index.scss';

/**
 * Vendors
 */
// import objectFitImages from 'object-fit-images';

/**
 * Modules
 */
// import language from './modules/language';

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  require('../html/index.html');
  require('../html/GUI.html');
  /* eslint-disable global-require */
}

// Запуск модулей
// language();

// Запуск плагинов
// objectFitImages();
