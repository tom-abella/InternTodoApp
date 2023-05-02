// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CompletedTask, TodoTask } = initSchema(schema);

export {
  CompletedTask,
  TodoTask
};