-- Crea roles, areas y usuarios iniciales
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Roles
INSERT INTO roles (role_name)
SELECT 'ADMIN' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name='ADMIN');
INSERT INTO roles (role_name)
SELECT 'FUNC' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name='FUNC');

-- Areas (cargos)
INSERT INTO area (name, description, active)
SELECT 'Rectora','Rectora', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Rectora');
INSERT INTO area (name, description, active)
SELECT 'Vicerrector Académico','Vicerrector Académico', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Vicerrector Académico');
INSERT INTO area (name, description, active)
SELECT 'Directora Unidad de Extensión y Proyección Social','Directora Unidad de Extensión y Proyección Social', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Unidad de Extensión y Proyección Social');
INSERT INTO area (name, description, active)
SELECT 'Directora Unidad de Investigaciones','Directora Unidad de Investigaciones', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Unidad de Investigaciones');
INSERT INTO area (name, description, active)
SELECT 'Directora Unidad de Aseguramiento de la Calidad','Directora Unidad de Aseguramiento de la Calidad', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Unidad de Aseguramiento de la Calidad');
INSERT INTO area (name, description, active)
SELECT 'Director Programa Ingeniería de Software','Director Programa Ingeniería de Software', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Director Programa Ingeniería de Software');
INSERT INTO area (name, description, active)
SELECT 'Director Programa Diseño Gráfico','Director Programa Diseño Gráfico', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Director Programa Diseño Gráfico');
INSERT INTO area (name, description, active)
SELECT 'Directora Programa Administración de Negocios de la Moda','Directora Programa Administración de Negocios de la Moda', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Programa Administración de Negocios de la Moda');
INSERT INTO area (name, description, active)
SELECT 'Director Programa Administración Financiera','Director Programa Administración Financiera', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Director Programa Administración Financiera');
INSERT INTO area (name, description, active)
SELECT 'Director Programa Administración de Negocios Internacionales - Distancia','Director Programa Administración de Negocios Internacionales - Distancia', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Director Programa Administración de Negocios Internacionales - Distancia');
INSERT INTO area (name, description, active)
SELECT 'Directora Programa Administración Turística y Hotelera','Directora Programa Administración Turística y Hotelera', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Programa Administración Turística y Hotelera');
INSERT INTO area (name, description, active)
SELECT 'Directora Programa Administración de Negocios Internacionales - Presencial','Directora Programa Administración de Negocios Internacionales - Presencial', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Directora Programa Administración de Negocios Internacionales - Presencial');
INSERT INTO area (name, description, active)
SELECT 'Representante de Docentes','Representante de Docentes', true WHERE NOT EXISTS (SELECT 1 FROM area WHERE name='Representante de Docentes');

-- Usuarios base
INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT
  nextval('employee_seq'), 'Admin', 'Sistema', 3000000000, 1001, 'admin', 'admin@fesc.edu.co',
  crypt('admin123', gen_salt('bf', 10)), true, true, true, true,
  (SELECT id FROM area WHERE name='Rectora' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='admin');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT
  nextval('employee_seq'), 'Brayan', 'User', 3000000001, 1002, 'brayan', 'brayan@fesc.edu.co',
  crypt('1234', gen_salt('bf', 10)), true, true, true, true,
  (SELECT id FROM area WHERE name='Rectora' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='brayan');

-- Admins por area (username admin + email)
INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Rectora', 3000000101, 2001,
  'adminrectora@fesc.edu.co', 'rectora@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Rectora' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminrectora@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Vicerrector', 3000000102, 2002,
  'adminvicerrectoracademico@fesc.edu.co', 'vicerrectoracademico@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Vicerrector Académico' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminvicerrectoracademico@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Extension', 3000000103, 2003,
  'adminextension@fesc.edu.co', 'extension@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Extensión y Proyección Social' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminextension@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Investigaciones', 3000000104, 2004,
  'admininvestigaciones@fesc.edu.co', 'investigaciones@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Investigaciones' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='admininvestigaciones@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Calidad', 3000000105, 2005,
  'admincalidad@fesc.edu.co', 'calidad@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Aseguramiento de la Calidad' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='admincalidad@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Software', 3000000106, 2006,
  'adminsoftware@fesc.edu.co', 'software@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Ingeniería de Software' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminsoftware@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Diseno', 3000000107, 2007,
  'admindisenografico@fesc.edu.co', 'disenografico@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Diseño Gráfico' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='admindisenografico@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Moda', 3000000108, 2008,
  'adminmoda@fesc.edu.co', 'moda@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración de Negocios de la Moda' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminmoda@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Financiera', 3000000109, 2009,
  'adminfinanciera@fesc.edu.co', 'financiera@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Administración Financiera' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminfinanciera@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'NegociosDistancia', 3000000110, 2010,
  'adminnegociosdistancia@fesc.edu.co', 'negociosdistancia@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Administración de Negocios Internacionales - Distancia' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminnegociosdistancia@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Turistica', 3000000111, 2011,
  'adminturistica@fesc.edu.co', 'turistica@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración Turística y Hotelera' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminturistica@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'NegociosPresencial', 3000000112, 2012,
  'adminnegociospresencial@fesc.edu.co', 'negociospresencial@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración de Negocios Internacionales - Presencial' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='adminnegociospresencial@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Admin', 'Docentes', 3000000113, 2013,
  'admindocentes@fesc.edu.co', 'docentes@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Representante de Docentes' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='admindocentes@fesc.edu.co');

-- Usuarios FUNC por area (username fun + email, password 123)
INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Rectora', 3100000101, 3001,
  'funrectora@fesc.edu.co', 'rectora@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Rectora' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funrectora@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Vicerrector', 3100000102, 3002,
  'funvicerrectoracademico@fesc.edu.co', 'vicerrectoracademico@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Vicerrector Académico' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funvicerrectoracademico@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Extension', 3100000103, 3003,
  'funextension@fesc.edu.co', 'extension@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Extensión y Proyección Social' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funextension@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Investigaciones', 3100000104, 3004,
  'funinvestigaciones@fesc.edu.co', 'investigaciones@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Investigaciones' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funinvestigaciones@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Calidad', 3100000105, 3005,
  'funcalidad@fesc.edu.co', 'calidad@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Unidad de Aseguramiento de la Calidad' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funcalidad@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Software', 3100000106, 3006,
  'funsoftware@fesc.edu.co', 'software@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Ingeniería de Software' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funsoftware@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Diseno', 3100000107, 3007,
  'fundisenografico@fesc.edu.co', 'disenografico@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Diseño Gráfico' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='fundisenografico@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Moda', 3100000108, 3008,
  'funmoda@fesc.edu.co', 'moda@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración de Negocios de la Moda' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funmoda@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Financiera', 3100000109, 3009,
  'funfinanciera@fesc.edu.co', 'financiera@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Administración Financiera' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funfinanciera@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'NegociosDistancia', 3100000110, 3010,
  'funnegociosdistancia@fesc.edu.co', 'negociosdistancia@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Director Programa Administración de Negocios Internacionales - Distancia' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funnegociosdistancia@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Turistica', 3100000111, 3011,
  'funturistica@fesc.edu.co', 'turistica@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración Turística y Hotelera' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funturistica@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'NegociosPresencial', 3100000112, 3012,
  'funnegociospresencial@fesc.edu.co', 'negociospresencial@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Directora Programa Administración de Negocios Internacionales - Presencial' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='funnegociospresencial@fesc.edu.co');

INSERT INTO employee
  (id, first_name, last_name, phone, identifier, username, institutional_email, password,
   enabled, account_non_expired, account_non_locked, credentials_non_expired, area_id)
SELECT nextval('employee_seq'), 'Func', 'Docentes', 3100000113, 3013,
  'fundocentes@fesc.edu.co', 'docentes@fesc.edu.co', crypt('123', gen_salt('bf', 10)),
  true, true, true, true, (SELECT id FROM area WHERE name='Representante de Docentes' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE username='fundocentes@fesc.edu.co');

-- Asignar rol ADMIN a todos
INSERT INTO employee_roles (employee_id, role_id)
SELECT e.id, r.id
FROM employee e, roles r
WHERE r.role_name='ADMIN'
AND e.username IN (
  'admin',
  'adminrectora@fesc.edu.co',
  'adminvicerrectoracademico@fesc.edu.co',
  'adminextension@fesc.edu.co',
  'admininvestigaciones@fesc.edu.co',
  'admincalidad@fesc.edu.co',
  'adminsoftware@fesc.edu.co',
  'admindisenografico@fesc.edu.co',
  'adminmoda@fesc.edu.co',
  'adminfinanciera@fesc.edu.co',
  'adminnegociosdistancia@fesc.edu.co',
  'adminturistica@fesc.edu.co',
  'adminnegociospresencial@fesc.edu.co',
  'admindocentes@fesc.edu.co'
)
AND NOT EXISTS (
  SELECT 1 FROM employee_roles er
  WHERE er.employee_id = e.id AND er.role_id = r.id
);

-- Asignar rol FUNC a brayan
INSERT INTO employee_roles (employee_id, role_id)
SELECT e.id, r.id
FROM employee e, roles r
WHERE r.role_name='FUNC' AND e.username='brayan'
AND NOT EXISTS (
  SELECT 1 FROM employee_roles er
  WHERE er.employee_id = e.id AND er.role_id = r.id
);

-- Asignar rol FUNC a los usuarios fun
INSERT INTO employee_roles (employee_id, role_id)
SELECT e.id, r.id
FROM employee e, roles r
WHERE r.role_name='FUNC'
AND e.username IN (
  'funrectora@fesc.edu.co',
  'funvicerrectoracademico@fesc.edu.co',
  'funextension@fesc.edu.co',
  'funinvestigaciones@fesc.edu.co',
  'funcalidad@fesc.edu.co',
  'funsoftware@fesc.edu.co',
  'fundisenografico@fesc.edu.co',
  'funmoda@fesc.edu.co',
  'funfinanciera@fesc.edu.co',
  'funnegociosdistancia@fesc.edu.co',
  'funturistica@fesc.edu.co',
  'funnegociospresencial@fesc.edu.co',
  'fundocentes@fesc.edu.co'
)
AND NOT EXISTS (
  SELECT 1 FROM employee_roles er
  WHERE er.employee_id = e.id AND er.role_id = r.id
);
