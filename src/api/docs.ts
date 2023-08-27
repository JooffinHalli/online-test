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
          type: 'radio' | 'checkbox' | 'input' | 'textarea'
          answers?: Array<
            {
              id: number
              content: string
              type?: 'radio' | 'checkbox' | 'input' | 'textarea'
            }
          >
        }
      >
    }
    post: {
      body: {
        answers: Array<
          string | number | Array<number>
        >
      }
      res: string
    }
  }
};

export type Questions = Docs['questions']['get']['res'];