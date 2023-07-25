const { By, Builder, Capabilities, Browser } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");

suite(
  function (env) {
    describe("Concessionaria", function () {
      let driver;

      before(async function () {
        // Configurar o driver antes de iniciar os testes
        //const capabilities = Capabilities.chrome();
        driver = await new Builder().forBrowser("chrome").build();
      });

      // Encerrar o driver após todos os testes
      after(async () => await driver.quit());

      it("Deve carregar a página de Concessionárias corretamente", async function () {
        // Abrir a página no navegador
        await driver.get("http://localhost:3000/admin/concessionarias");

        // Verificar se o título da página é exibido corretamente
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Concessionárias");
      });

      it("Deve carregar a página de Carros corretamente", async function () {
        // Abrir a página no navegador
        await driver.get("http://localhost:3000/admin/carros");

        // Verificar se o título da página é exibido corretamente
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Carros");
      });

      it("Deve carregar a página de Vendedores corretamente", async function () {
        // Abrir a página no navegador
        await driver.get("http://localhost:3000/admin/vendedores");

        // Verificar se o título da página é exibido corretamente
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Vendedores");
      });

      it("Deve carregar a página de Clientes corretamente", async function () {
        // Abrir a página no navegador
        await driver.get("http://localhost:3000/admin/clientes");

        // Verificar se o título da página é exibido corretamente
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Clientes");
      });

      it("Deve exibir uma tabela de dados", async function () {
        // Abrir a página no navegador
        await driver.get("http://localhost:3000/admin/concessionarias");
        // Verificar se a tabela de dados está presente
        // class name gerado pela tabela no html: sc-fLlhyt ifOHjV
        const tableElemente = await driver.findElement(
          By.className("sc-fLlhyt ifOHjV")
        );
        assert.ok(tableElemente, "sc-fLlhyt ifOHjV");
      });

      it("Deve adicionar uma nova concessionária", async function () {
        // Abrir a página de adicionar concessionária
        await driver.get("http://localhost:3000/admin/concessionarias");

        const cadastrar_transacao = driver.findElement(
          By.xpath('//*[@id="__next"]/div/div/div[1]/button')
        );
        cadastrar_transacao.click();

        const nome_input = driver.findElement(By.xpath('//*[@id="nome"]'));
        nome_input.sendKeys("teste de concessionaria");
        const botaoSalvar = driver.findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[1]/div[1]/div/div/form/div[3]/button[2]'
          )
        );
        botaoSalvar.click();

        const botaoOrdenar = driver.findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[2]/div[1]/div/div/div[1]/div/div[1]/div/span'
          )
        );
        botaoOrdenar.click();

        const primeiraLinha = driver.findElement(
          By.xpath('//*[@id="cell-data-1"]')
        );
        assert.ok(primeiraLinha, "teste de concessionaria");
      });

      it("Deve excluir uma concessionária", async function () {
        // Abrir a página de listagem de concessionárias
        await driver.get("http://localhost:3000/admin/concessionarias");

        //cadastra concessionaria para ser excluida
        const cadastrar_transacao = driver.findElement(
          By.xpath('//*[@id="__next"]/div/div/div[1]/button')
        );
        cadastrar_transacao.click();

        const nome_input = driver.findElement(By.xpath('//*[@id="nome"]'));
        nome_input.sendKeys("concessionaria2");
        const botaoSalvar = driver.findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[1]/div[1]/div/div/form/div[3]/button[2]'
          )
        );
        botaoSalvar.click();

        //cadastra concessionaria para ser exibida apos a 1 ser excluida
        const cadastrar_transacao2 = driver.findElement(
          By.xpath('//*[@id="__next"]/div/div/div[1]/button')
        );
        cadastrar_transacao2.click();

        const nome_input2 = driver.findElement(By.xpath('//*[@id="nome"]'));
        nome_input2.sendKeys("excluir");
        const botaoSalvar2 = driver.findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[1]/div[1]/div/div/form/div[3]/button[2]'
          )
        );
        botaoSalvar2.click();

        const botaoOrdenar = driver.findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[2]/div[1]/div/div/div[1]/div/div[1]/div/span'
          )
        );
        botaoOrdenar.click();

        const primeiraLinha = driver.findElement(
          By.xpath('//*[@id="cell-data-1"]')
        );
        assert.ok(primeiraLinha, "excluir");

        //excluir concessionaria cadastrada
        const botaoExcluir = driver.findElement(
          By.xpath('//*[@id="cell-acoes-1"]/div/button')
        );
        botaoExcluir.click();

        const botaoConfirmarExclusao = driver.findElement(
          By.xpath(
            '//*[@id="cell-acoes-1"]/div/div[1]/div/div/div[3]/button[2]'
          )
        );
        botaoConfirmarExclusao.click();

        await driver.get("http://localhost:3000/admin/concessionarias");

        const concessionaireRow = driver.findElements(By.xpath(primeiraLinha));
        assert.ok(concessionaireRow, "excluir");
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
