/*
 *   Copyright 2012 Norio Agawa
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

package cherry.sample.app.db;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import cherry.spring.db.SqlExecutor;

/**
 * DBにスキーマを作成する.
 */
@Component("schemaInitializer")
public class SchemaInitializer implements InitializingBean {

	/** DDLファイル. */
	@Value("classpath:ddl.sql")
	private Resource ddl;

	/** DDLのエンコーディング. */
	@Value("UTF-8")
	private Charset charset;

	/** DDL実行機能. */
	@Autowired
	private SqlExecutor sqlExecutor;

	/**
	 * DBにスキーマを作成する.
	 */
	@Override
	public void afterPropertiesSet() throws IOException {
		Reader reader = new InputStreamReader(ddl.getInputStream(), charset);
		try {
			sqlExecutor.execute(reader, null, true);
		} finally {
			reader.close();
		}
	}

}
