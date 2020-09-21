exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('userimages', function (table) {
      table.increments();
      table.string('userid').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('image').notNullable();
      table.timestamps(true, true);
    })
    .createTable('contexts', function (table) {
      table.increments();
      table.enum('contextoption', 
        ['Product Leadership', 'Delivery Management', 'Project Management', 'Design Leadership', 'Engineering Leadership'])
        .defaultTo('Product Leadership');
    })
    .createTable('questions', function (table) {
      table.increments();
      table.enum('type', ['Context Questions', 'Request Questions']).defaultTo('Context Questions');
      table.enum('style', ['Text', 'Star Rating', 'Yes or No', 'Multiple Choice', 'URL']).defaultTo('Text');
      table.text('question').notNullable()
    })
    .createTable('topics', function (table) {
      table.increments();
      table.string('leaderid').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('topicname').notNullable();
      table.enum('topicfrequency', ['Daily', 'Weekly', 'Monthly', 'Off']).defaultTo('Off');
      table.integer('contextid').unsigned().notNullable().references('id').inTable('contexts').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('joincode').unique();
      table.timestamps(true, true);
    })
    .createTable('topic_questions', function (table) {
      table.increments();
      table.integer('topicid').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('questionid').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
    })

    .createTable('responses', function (table) {
      table.increments();
      table.integer('questionid').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
      table.text('response').notNullable();
      table.string('respondedby').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('topicid').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamps(true, true);
    })

    .createTable('topicmembers', function (table) {
      table.increments();
      table.integer('topicid').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('leaderid').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('memberid').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    })

    .createTable('threads', function (table) {
      table.increments();
      table.integer('responseid').unsigned().notNullable().references('id').inTable('responses').onDelete('CASCADE').onUpdate('CASCADE');
      table.text('reply').notNullable();
      table.string('repliedby').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('notifications', function (table) {
      table.increments();
      table.string('sentto').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('topicid').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE').onUpdate('CASCADE');
      table.text('notification').notNullable();
      table.timestamps(true, true);
    })
};

exports.down = (knex) => {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('userimages')
  .dropTableIfExists('contexts')
  .dropTableIfExists('questions')
  .dropTableIfExists('topics')
  .dropTableIfExists('responses')
  .dropTableIfExists('topicmembers')
  .dropTableIfExists('threads')
  .dropTableIfExists('notifications')
};
