// Spring JDBC Transaction Demo JavaScript
// Simulates database operations and transaction management

class TransactionManager {
    constructor() {
        this.currentTransaction = null;
        this.isolationLevel = 'READ_COMMITTED';
        this.transactionCount = { committed: 0, rolledBack: 0 };
        this.connectionPool = { available: 10, total: 10 };
        this.transactionId = 0;
        
        // Initialize database state
        this.accounts = [
            { id: 1, name: 'Alice', balance: 1000, status: 'ACTIVE' },
            { id: 2, name: 'Bob', balance: 500, status: 'ACTIVE' },
            { id: 3, name: 'Charlie', balance: 750, status: 'ACTIVE' }
        ];
        
        this.transactions = [];
        this.tempAccounts = null; // For transaction rollback
        this.tempTransactions = null;
        
        this.updateUI();
    }
    
    log(message, type = 'info', outputId = 'basicOutput') {
        const output = document.getElementById(outputId);
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.innerHTML = `<span>[${new Date().toLocaleTimeString()}]</span> ${message}`;
        output.appendChild(logEntry);
        output.scrollTop = output.scrollHeight;
    }
    
    updateUI() {
        this.updateAccountsTable();
        this.updateTransactionsTable();
        this.updateTransactionInfo();
    }
    
    updateAccountsTable() {
        const tbody = document.getElementById('accountsTableBody');
        tbody.innerHTML = '';
        
        this.accounts.forEach(account => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${account.id}</td>
                <td>${account.name}</td>
                <td>$${account.balance.toFixed(2)}</td>
                <td><span style="color: ${account.status === 'ACTIVE' ? 'green' : 'red'}">${account.status}</span></td>
            `;
        });
    }
    
    updateTransactionsTable() {
        const tbody = document.getElementById('transactionsTableBody');
        tbody.innerHTML = '';
        
        this.transactions.slice(-10).forEach(transaction => {
            const row = tbody.insertRow();
            const statusColor = transaction.status === 'SUCCESS' ? 'green' : 
                              transaction.status === 'FAILED' ? 'red' : 'orange';
            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.fromAccount}</td>
                <td>${transaction.toAccount}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td><span style="color: ${statusColor}">${transaction.status}</span></td>
                <td>${transaction.timestamp}</td>
            `;
        });
    }
    
    updateTransactionInfo() {
        const currentInfo = document.getElementById('currentTransactionInfo');
        const poolInfo = document.getElementById('connectionPoolInfo');
        const countInfo = document.getElementById('transactionCount');
        
        currentInfo.textContent = this.currentTransaction ? 
            `Transaction ${this.currentTransaction.id} (${this.isolationLevel})` : 
            'No active transaction';
        
        poolInfo.textContent = `Available: ${this.connectionPool.available}/${this.connectionPool.total}`;
        countInfo.textContent = `Committed: ${this.transactionCount.committed} | Rolled back: ${this.transactionCount.rolledBack}`;
    }
    
    startTransaction() {
        if (this.currentTransaction) {
            this.log('Transaction already active!', 'warning');
            return;
        }
        
        this.transactionId++;
        this.currentTransaction = {
            id: this.transactionId,
            isolationLevel: this.isolationLevel,
            startTime: new Date(),
            operations: []
        };
        
        // Save current state for rollback
        this.tempAccounts = JSON.parse(JSON.stringify(this.accounts));
        this.tempTransactions = JSON.parse(JSON.stringify(this.transactions));
        
        this.connectionPool.available--;
        this.log(`🔄 Transaction ${this.transactionId} started with isolation level: ${this.isolationLevel}`, 'info');
        this.updateUI();
    }
    
    commitTransaction() {
        if (!this.currentTransaction) {
            this.log('No active transaction to commit!', 'warning');
            return;
        }
        
        const transactionId = this.currentTransaction.id;
        this.currentTransaction = null;
        this.tempAccounts = null;
        this.tempTransactions = null;
        this.connectionPool.available++;
        this.transactionCount.committed++;
        
        this.log(`✅ Transaction ${transactionId} committed successfully!`, 'success');
        this.updateUI();
    }
    
    rollbackTransaction() {
        if (!this.currentTransaction) {
            this.log('No active transaction to rollback!', 'warning');
            return;
        }
        
        const transactionId = this.currentTransaction.id;
        
        // Restore previous state
        if (this.tempAccounts) {
            this.accounts = this.tempAccounts;
        }
        if (this.tempTransactions) {
            this.transactions = this.tempTransactions;
        }
        
        this.currentTransaction = null;
        this.tempAccounts = null;
        this.tempTransactions = null;
        this.connectionPool.available++;
        this.transactionCount.rolledBack++;
        
        this.log(`❌ Transaction ${transactionId} rolled back!`, 'error');
        this.updateUI();
    }
    
    setIsolationLevel(level) {
        this.isolationLevel = level;
        this.log(`🔧 Isolation level set to: ${level}`, 'info');
        this.updateUI();
    }
    
    findAccount(id) {
        return this.accounts.find(acc => acc.id === id);
    }
    
    transferFunds(amount, forceError, fromAccountId = 1, toAccountId = 2) {
        this.log(`💰 Starting fund transfer: $${amount} from Account ${fromAccountId} to Account ${toAccountId}`, 'info', 'transferOutput');
        
        // Simulate @Transactional annotation
        const wasTransactionActive = !!this.currentTransaction;
        if (!wasTransactionActive) {
            this.startTransaction();
            this.log('📝 @Transactional: Auto-started transaction', 'info', 'transferOutput');
        }
        
        try {
            const fromAccount = this.findAccount(fromAccountId);
            const toAccount = this.findAccount(toAccountId);
            
            if (!fromAccount || !toAccount) {
                throw new Error('Account not found');
            }
            
            if (fromAccount.balance < amount) {
                throw new Error('Insufficient funds');
            }
            
            // Simulate processing delay
            this.log('🔄 Processing transfer...', 'info', 'transferOutput');
            
            // Debit from source account
            fromAccount.balance -= amount;
            this.log(`💸 Debited $${amount} from ${fromAccount.name}`, 'info', 'transferOutput');
            
            // Simulate error condition
            if (forceError) {
                throw new Error('Simulated database error during transfer');
            }
            
            // Credit to destination account
            toAccount.balance += amount;
            this.log(`💰 Credited $${amount} to ${toAccount.name}`, 'success', 'transferOutput');
            
            // Record transaction
            this.transactions.push({
                id: this.transactions.length + 1,
                fromAccount: fromAccount.name,
                toAccount: toAccount.name,
                amount: amount,
                status: 'SUCCESS',
                timestamp: new Date().toLocaleString()
            });
            
            if (!wasTransactionActive) {
                this.commitTransaction();
                this.log('✅ @Transactional: Auto-committed transaction', 'success', 'transferOutput');
            }
            
            this.log(`🎉 Transfer completed successfully!`, 'success', 'transferOutput');
            
        } catch (error) {
            this.log(`❌ Transfer failed: ${error.message}`, 'error', 'transferOutput');
            
            // Record failed transaction
            this.transactions.push({
                id: this.transactions.length + 1,
                fromAccount: fromAccountId,
                toAccount: toAccountId,
                amount: amount,
                status: 'FAILED',
                timestamp: new Date().toLocaleString()
            });
            
            if (!wasTransactionActive) {
                this.rollbackTransaction();
                this.log('🔄 @Transactional: Auto-rolled back transaction', 'warning', 'transferOutput');
            }
        }
        
        this.updateUI();
    }
    
    batchInsert(withError) {
        this.log('📦 Starting batch insert operation', 'info', 'batchOutput');
        
        const wasTransactionActive = !!this.currentTransaction;
        if (!wasTransactionActive) {
            this.startTransaction();
            this.log('📝 Batch operation: Auto-started transaction', 'info', 'batchOutput');
        }
        
        try {
            const newAccounts = [
                { id: 10, name: 'David', balance: 300, status: 'ACTIVE' },
                { id: 11, name: 'Emma', balance: 800, status: 'ACTIVE' },
                { id: 12, name: 'Frank', balance: 450, status: 'ACTIVE' }
            ];
            
            for (let i = 0; i < newAccounts.length; i++) {
                const account = newAccounts[i];
                
                // Simulate error on second insert
                if (withError && i === 1) {
                    throw new Error('Duplicate key violation');
                }
                
                // Check if account already exists
                if (this.findAccount(account.id)) {
                    this.log(`⚠️ Account ${account.id} already exists, skipping...`, 'warning', 'batchOutput');
                    continue;
                }
                
                this.accounts.push(account);
                this.log(`➕ Inserted account: ${account.name} (ID: ${account.id})`, 'info', 'batchOutput');
            }
            
            if (!wasTransactionActive) {
                this.commitTransaction();
                this.log('✅ Batch insert: Auto-committed transaction', 'success', 'batchOutput');
            }
            
            this.log('🎉 Batch insert completed successfully!', 'success', 'batchOutput');
            
        } catch (error) {
            this.log(`❌ Batch insert failed: ${error.message}`, 'error', 'batchOutput');
            
            if (!wasTransactionActive) {
                this.rollbackTransaction();
                this.log('🔄 Batch insert: Auto-rolled back transaction', 'warning', 'batchOutput');
            }
        }
        
        this.updateUI();
    }
    
    batchUpdate() {
        this.log('📦 Starting batch update operation', 'info', 'batchOutput');
        
        const wasTransactionActive = !!this.currentTransaction;
        if (!wasTransactionActive) {
            this.startTransaction();
            this.log('📝 Batch operation: Auto-started transaction', 'info', 'batchOutput');
        }
        
        try {
            // Update all accounts with bonus
            const bonusAmount = 50;
            let updatedCount = 0;
            
            this.accounts.forEach(account => {
                if (account.status === 'ACTIVE') {
                    account.balance += bonusAmount;
                    updatedCount++;
                    this.log(`💰 Added $${bonusAmount} bonus to ${account.name}`, 'info', 'batchOutput');
                }
            });
            
            if (!wasTransactionActive) {
                this.commitTransaction();
                this.log('✅ Batch update: Auto-committed transaction', 'success', 'batchOutput');
            }
            
            this.log(`🎉 Batch update completed! Updated ${updatedCount} accounts`, 'success', 'batchOutput');
            
        } catch (error) {
            this.log(`❌ Batch update failed: ${error.message}`, 'error', 'batchOutput');
            
            if (!wasTransactionActive) {
                this.rollbackTransaction();
                this.log('🔄 Batch update: Auto-rolled back transaction', 'warning', 'batchOutput');
            }
        }
        
        this.updateUI();
    }
    
    demonstratePropagation(propagation) {
        this.log(`🔄 Demonstrating ${propagation} propagation behavior`, 'info', 'propagationOutput');
        
        const wasTransactionActive = !!this.currentTransaction;
        
        switch (propagation) {
            case 'REQUIRED':
                this.log('📝 REQUIRED: Join existing transaction or create new one', 'info', 'propagationOutput');
                if (!wasTransactionActive) {
                    this.startTransaction();
                    this.log('🆕 Created new transaction', 'info', 'propagationOutput');
                } else {
                    this.log('🔗 Joined existing transaction', 'info', 'propagationOutput');
                }
                
                // Simulate some operation
                this.simulateOperation('REQUIRED operation completed');
                break;
                
            case 'REQUIRES_NEW':
                this.log('📝 REQUIRES_NEW: Always create new transaction', 'info', 'propagationOutput');
                const suspendedTransaction = this.currentTransaction;
                
                if (suspendedTransaction) {
                    this.log('⏸️ Suspended current transaction', 'warning', 'propagationOutput');
                }
                
                this.currentTransaction = null;
                this.startTransaction();
                this.log('🆕 Created new transaction', 'info', 'propagationOutput');
                
                this.simulateOperation('REQUIRES_NEW operation completed');
                this.commitTransaction();
                
                if (suspendedTransaction) {
                    this.currentTransaction = suspendedTransaction;
                    this.log('▶️ Resumed suspended transaction', 'info', 'propagationOutput');
                }
                break;
                
            case 'NESTED':
                this.log('📝 NESTED: Create savepoint within current transaction', 'info', 'propagationOutput');
                if (!wasTransactionActive) {
                    this.startTransaction();
                    this.log('🆕 Created new transaction for nested operation', 'info', 'propagationOutput');
                }
                
                this.log('🔖 Created savepoint', 'info', 'propagationOutput');
                this.simulateOperation('NESTED operation completed');
                this.log('✅ Savepoint committed', 'success', 'propagationOutput');
                break;
                
            case 'SUPPORTS':
                this.log('📝 SUPPORTS: Use current transaction if exists, otherwise non-transactional', 'info', 'propagationOutput');
                if (wasTransactionActive) {
                    this.log('🔗 Using existing transaction', 'info', 'propagationOutput');
                } else {
                    this.log('🚫 No transaction - executing non-transactionally', 'warning', 'propagationOutput');
                }
                
                this.simulateOperation('SUPPORTS operation completed');
                break;
        }
        
        this.updateUI();
    }
    
    simulateOperation(message) {
        // Simulate a database operation
        const account = this.findAccount(1);
        if (account) {
            account.balance += 10;
            this.log(`💰 Simulated operation: Added $10 to ${account.name}`, 'info', 'propagationOutput');
        }
        this.log(`✅ ${message}`, 'success', 'propagationOutput');
    }
    
    resetDatabase() {
        this.log('🔄 Resetting database to initial state...', 'info');
        
        // Reset all state
        this.accounts = [
            { id: 1, name: 'Alice', balance: 1000, status: 'ACTIVE' },
            { id: 2, name: 'Bob', balance: 500, status: 'ACTIVE' },
            { id: 3, name: 'Charlie', balance: 750, status: 'ACTIVE' }
        ];
        
        this.transactions = [];
        this.currentTransaction = null;
        this.tempAccounts = null;
        this.tempTransactions = null;
        this.connectionPool.available = 10;
        this.transactionCount = { committed: 0, rolledBack: 0 };
        
        // Clear all outputs
        ['basicOutput', 'transferOutput', 'batchOutput', 'propagationOutput'].forEach(id => {
            document.getElementById(id).innerHTML = '';
        });
        
        this.log('✅ Database reset completed!', 'success');
        this.updateUI();
    }
}

// Initialize the transaction manager
const transactionManager = new TransactionManager();

// Global functions for HTML onclick handlers
function startTransaction() {
    transactionManager.startTransaction();
}

function commitTransaction() {
    transactionManager.commitTransaction();
}

function rollbackTransaction() {
    transactionManager.rollbackTransaction();
}

function setIsolationLevel(level) {
    transactionManager.setIsolationLevel(level);
}

function transferFunds(amount, forceError) {
    transactionManager.transferFunds(amount, forceError);
}

function batchInsert(withError) {
    transactionManager.batchInsert(withError);
}

function batchUpdate() {
    transactionManager.batchUpdate();
}

function demonstratePropagation(propagation) {
    transactionManager.demonstratePropagation(propagation);
}

function resetDatabase() {
    transactionManager.resetDatabase();
}

// Auto-update UI every few seconds to show real-time changes
setInterval(() => {
    transactionManager.updateUI();
}, 5000);

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', () => {
    transactionManager.updateUI();
    transactionManager.log('🚀 Spring JDBC Transaction Demo initialized!', 'success');
});