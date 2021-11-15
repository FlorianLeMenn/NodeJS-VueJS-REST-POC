BEGIN;

INSERT INTO "user" ("username", "email", "password", "roles", "status", "birthday", "filename", "activation_token", "created_at", "updated_at") 
VALUES ('florian', 'test-flo@test.fr', 'test', '["ROLE_USER"]', true, NOW(), '', '', NOW(), NOW());

INSERT INTO "group" ("title", "description", "private", "user_id","created_at", "updated_at") VALUES
('groupe_1', 'Groupe de test', false, 1, NOW(), NOW());

INSERT INTO "group_members" ("username_alias", "roles", "access", "group_id", "user_id", "created_at", "updated_at" ) VALUES
('florian_alias', '["ROLE_GROUP_MEMBER"]', true, 1, 1, NOW(), NOW());

COMMIT;