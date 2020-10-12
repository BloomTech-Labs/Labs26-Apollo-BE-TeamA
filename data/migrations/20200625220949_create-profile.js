exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", function (table) {
      table.string("id").notNullable().unique().primary();
      table.string("firstname");
      table.string("lastname");
      table.string("email");
      table.string("avatarUrl");
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("userimages", function (table) {
      table.increments();
      table
        .string("userid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("image").notNullable();
      table.timestamps(true, true);
    })
    .createTable("contexts", function (table) {
      table.increments();
      table
        .enum("contextoption", [
          "Product Leadership",
          "Delivery Management",
          "Project Management",
          "Design Leadership",
          "Engineering Leadership",
        ])
        .defaultTo("Product Leadership");
    })
    .createTable("contextquestions", function (table) {
      table.increments();
      table
        .enum("style", [
          "Text",
          "Star Rating",
          "Yes or No",
          "Multiple Choice",
          "URL",
        ])
        .defaultTo("Text");
      table.text("question").notNullable().unique();
      table.boolean("default").defaultTo(false);
    })
    .createTable("requestquestions", function (table) {
      table.increments();
      table
        .enum("style", [
          "Text",
          "Star Rating",
          "Yes or No",
          "Multiple Choice",
          "URL",
        ])
        .defaultTo("Text");
      table.text("question").notNullable().unique();
      table.boolean("default").defaultTo(false);
    })

    .createTable("topics", function (table) {
      table.increments();
      table
        .string("leaderid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("topicname").notNullable();
      table
        .enum("topicfrequency", ["Daily", "Weekly", "Monthly", "Off"])
        .defaultTo("Off");
      table
        .integer("contextid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("contexts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("joincode").unique();
      table.timestamps(true, true);
    })
    .createTable("topic_context_questions", function (table) {
      table
        .integer("topicid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("topics")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("contextquestionid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("contextquestions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.primary(["topicid", "contextquestionid"]);
    })
    .createTable("topic_request_questions", function (table) {
      table
        .integer("topicid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("topics")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("requestquestionid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("requestquestions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.primary(["topicid", "requestquestionid"]);
    })

    .createTable("survey_requests", function (table) {
      table.increments();
      table
        .integer("topicid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("topics")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("survey_request_questions", function (table) {
      table
        .integer("surveyrequestid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("survey_requests")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("requestquestionid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("requestquestions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.primary(["surveyrequestid", "requestquestionid"]);
      table.timestamps(true, true);
    })
    .createTable("request_questions_response", function (table) {
      table.increments();
      table
        .integer("surveyrequestid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("survey_requests")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("requestquestionid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("requestquestions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("response").notNullable();
      table
        .string("respondedby")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("context_questions_response", function (table) {
      table.primary(["surveyrequestid", "contextquestionid"]);
      table
        .integer("surveyrequestid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("survey_requests")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("contextquestionid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("contextquestions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("response").notNullable();
      table.timestamps(true, true);
    })

    .createTable("topicmembers", function (table) {
      table
        .integer("topicid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("topics")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .string("memberid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.primary(["topicid", "memberid"]);
    })

    .createTable("threads", function (table) {
      table.increments();
      table
        .integer("responseid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("request_questions_response")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("reply").notNullable();
      table
        .string("repliedby")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps(true, true);
    })

    .createTable("notifications", function (table) {
      table.increments();
      table
        .string("sentto")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("topicid")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("topics")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("notification").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("userimages")
    .dropTableIfExists("contexts")
    .dropTableIfExists("contextquestions")
    .dropTableIfExists("requestquestions")
    .dropTableIfExists("survey_requests")
    .dropTableIfExists("survey_request_questions")
    .dropTableIfExists("request_questions_response")
    .dropTableIfExists("context_questions_response")
    .dropTableIfExists("topicmembers")
    .dropTableIfExists("threads")
    .dropTableIfExists("notifications");
};
