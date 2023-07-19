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

      it("Deve exibir uma tabela de dados", async function () {
        // Verificar se a tabela de dados está presente
        const tableElement = await driver.findElement(By.name('Nome'));
        assert.ok(tableElement, "Tabela de dados não encontrada");

        // Verificar se os campos da tabela de dados estão preenchidos corretamente
        const rows = await tableElement.findElements(By.name("Data Criação"));
        assert.ok(rows.length > 1, "Nenhuma concessionária encontrada na tabela.");

        // for (const row of rows) {
        //   const id = await row.findElement(By.css("td:nth-child(1)")).getText();
        //   const nome = await row.findElement(By.css("td:nth-child(2)")).getText();
        //   const endereco = await row.findElement(By.css("td:nth-child(3)")).getText();
        //   const telefone = await row.findElement(By.css("td:nth-child(4)")).getText();

        //   assert.notEqual(id, "");
        //   assert.notEqual(nome, "");
        //   assert.notEqual(endereco, "");
        //   assert.notEqual(telefone, "");
        // }
      });

      it("Deve exibir um aviso quando não há concessionárias cadastradas", async function () {
        // Verificar se o aviso de tabela vazia está presente
        const emptyTableElement = await driver.findElement(By.css(".empty-table"));
        const warningText = await emptyTableElement.getText();

        assert.strictEqual(warningText, "Não há concessionárias cadastradas :(");
      });

      it("Deve adicionar uma nova concessionária", async function () {
        // Abrir a página de adicionar concessionária
        await driver.get("http://localhost:3000/admin/adicionar-concessionaria");

        // Preencher os campos do formulário
        const nomeInput = await driver.findElement(By.name("nome"));

        const newConcessionaria = {
          nome: "Nova Concessionária Teste",
        };

        await nomeInput.sendKeys(newConcessionaria.nome);

        // Enviar o formulário
        await driver.findElement(By.css("form")).submit();

        // Verificar se a página redirecionou para a página de listagem de concessionárias
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Concessionárias");
      });

      it("Deve editar uma concessionária existente", async function () {
        // Abrir a página de listagem de concessionárias
        await driver.get("http://localhost:3000/admin/concessionarias");

        // Verificar se há alguma concessionária na tabela
        const tableElement = await driver.findElement(By.css(".rdt_Table"));
        const rows = await tableElement.findElements(By.css("tr"));
        assert.ok(rows.length > 1, "Nenhuma concessionária encontrada na tabela.");

        // Clicar no botão "Editar" da primeira concessionária da tabela
        const editButton = await rows[1].findElement(By.css(".edit-button"));
        await editButton.click();

        // Atualizar os campos do formulário
        const nomeInput = await driver.findElement(By.name("nome"));

        const updatedConcessionaria = {
          nome: "Concessionária Editada",
        };

        await nomeInput.clear();
        await nomeInput.sendKeys(updatedConcessionaria.nome);

        // Enviar o formulário de edição
        await driver.findElement(By.css("form")).submit();

        // Verificar se a página redirecionou para a página de listagem de concessionárias
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Concessionárias");
      });

      it("Deve excluir uma concessionária", async function () {
        // Abrir a página de listagem de concessionárias
        await driver.get("http://localhost:3000/admin/concessionarias");

        // Verificar se há alguma concessionária na tabela
        const tableElement = await driver.findElement(By.css(".rdt_Table"));
        const rows = await tableElement.findElements(By.css("tr"));
        assert.ok(rows.length > 1, "Nenhuma concessionária encontrada na tabela.");

        // Clicar no botão "Excluir" da primeira concessionária da tabela
        const deleteButton = await rows[1].findElement(By.css(".delete-button"));
        await deleteButton.click();

        // Confirmar a exclusão no modal de confirmação
        const confirmButton = await driver.findElement(By.css(".confirm-button"));
        await confirmButton.click();

        // Verificar se a página redirecionou para a página de listagem de concessionárias
        const pageTitle = await driver.findElement(By.css("h2")).getText();
        assert.strictEqual(pageTitle, "Concessionárias");
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
