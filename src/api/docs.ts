/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/online-test.git
*  . ветка: main
*  ...................................................................................
*/

/** Документация эндпойнтов */
export type Docs = {
  'questions': {
    path: `questions`
    get: {
      res: Array<
        {
          id: number
          question: string
          isMulti: boolean
          responses: Array<
            {
              id: number
              content: string
            }
          >
        }
      >
    }
  }
};

export type Questions = Docs['questions']['get']['res'];