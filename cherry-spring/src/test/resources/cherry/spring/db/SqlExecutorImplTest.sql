--
--   Copyright 2012 Norio Agawa
--
--   Licensed under the Apache License, Version 2.0 (the "License");
--   you may not use this file except in compliance with the License.
--   You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--   Unless required by applicable law or agreed to in writing, software
--   distributed under the License is distributed on an "AS IS" BASIS,
--   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--   See the License for the specific language governing permissions and
--   limitations under the License.
--

-- スキーマ作成
DROP TABLE member;
CREATE TABLE member (
	id		DECIMAL(10) NOT NULL,
	login	VARCHAR(32) NOT NULL,
	passwd	VARCHAR(64) NOT NULL,
	name	VARCHAR(255),
	del_flg	CHAR(1)	DEFAULT '0'
);
ALTER TABLE member ADD PRIMARY KEY (id);

-- 初期データ投入
INSERT INTO member (id, login, passwd, name, del_flg) VALUES (1, 'user1', 'user1', NULL, '0');
INSERT INTO member (id, login, passwd, name, del_flg) VALUES (2, 'user2', 'user2', NULL, '0');
INSERT INTO member (id, login, passwd, name, del_flg) VALUES (3, 'user3', 'user3', NULL, '0');
INSERT INTO member (id, login, passwd, name, del_flg) VALUES (4, 'user4', 'user4', NULL, '0');
INSERT INTO member (id, login, passwd, name, del_flg) VALUES (5, 'user5', 'user5', NULL, '0');

-- データ更新
UPDATE member SET name = login;
